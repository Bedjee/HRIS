<?php

namespace App\Modules\ApplicantManagement\Services;

use App\Modules\ApplicantManagement\Models\Applicant;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;

class PDSGeneratorService
{
    protected $templatePath;

    public function __construct()
    {
        $this->templatePath = storage_path('app/templates/CSC_PDS.xlsx');
    }

    public function generatePersonalInfoPreview(Applicant $applicant): string
    {
        Log::info('=== PDS Generation Started ===');
        Log::info('Applicant ID: ' . $applicant->id);

        if (!$applicant->relationLoaded('personalInformation')) {
            Log::warning('personalInformation relation is NOT loaded. Loading now...');
            $applicant->load('personalInformation');
        } else {
            Log::info('personalInformation relation IS loaded.');
        }

        // Load the template
        $spreadsheet = IOFactory::load($this->templatePath);
        $this->cleanWorkbook($spreadsheet);

        $worksheet = $spreadsheet->getSheetByName('C1');
        if (!$worksheet) {
            $worksheet = $spreadsheet->getActiveSheet();
            Log::warning('Sheet C1 not found, using active sheet instead.');
        }

        $mapping = config('pds_mapping.worksheets.C1');
        Log::info('Mapping loaded: ' . json_encode(array_keys($mapping)));

        // Populate simple fields
        foreach ($mapping as $cell => $source) {
            if (is_array($source)) {
                continue;
            }

            $value = $this->resolveValue($applicant, $source);

            if ($value instanceof \Carbon\Carbon) {
                $value = $value->format('d/m/Y');
            }

            $valueString = $value ?? '(null)';
            Log::info("Cell {$cell} ← source '{$source}' → value: {$valueString}");

            $worksheet->setCellValue($cell, $value ?? '');
        }

        // Handle checkboxes
        $this->handleCheckboxes($worksheet, $applicant, $mapping);

        $tempDir = storage_path('app/temp');
        if (!is_dir($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $fileName = 'PDS_Preview_' . $applicant->id . '_' . now()->format('Ymd_His') . '.xlsx';
        $tempPath = $tempDir . '/' . $fileName;

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save($tempPath);

        Log::info('File saved: ' . $tempPath);
        Log::info('=== PDS Generation Finished ===');

        return $tempPath;
    }

    protected function cleanWorkbook($spreadsheet): void
    {
        $namedRanges = $spreadsheet->getNamedRanges();
        foreach ($namedRanges as $namedRange) {
            $spreadsheet->removeNamedRange($namedRange->getName());
        }

        try {
            $spreadsheet->getSecurity()->setLockWindows(false);
            $spreadsheet->getSecurity()->setLockStructure(false);
        } catch (\Exception $e) {
            // ignore
        }

        foreach ($spreadsheet->getAllSheets() as $sheet) {
            $sheet->setSheetState(\PhpOffice\PhpSpreadsheet\Worksheet\Worksheet::SHEETSTATE_VISIBLE);
        }
    }

    /**
     * ✅ Manually resolve dot notation for relationships and attributes.
     */
    protected function resolveValue(Applicant $applicant, $source)
    {
        if (is_string($source)) {
            // Handle email separately
            if ($source === 'user.email') {
                return $applicant->user->email ?? '';
            }

            // Handle dot notation manually
            $parts = explode('.', $source);
            $value = $applicant;

            foreach ($parts as $part) {
                if (is_null($value)) {
                    return null;
                }

                // Check if it's a relationship (method exists on the model)
                if (method_exists($value, $part)) {
                    $value = $value->$part;
                }
                // Otherwise, treat it as an attribute
                else {
                    $value = $value->$part ?? null;
                }
            }

            return $value;
        }
        return null;
    }

    protected function handleCheckboxes($worksheet, Applicant $applicant, array $mapping): void
    {
        foreach ($mapping as $key => $config) {
            if (!is_array($config) || $config['type'] !== 'checkbox') {
                continue;
            }

            $field = $config['field'];
            $value = $this->resolveValue($applicant, $field);
            $options = $config['options'];
            Log::info("Checkbox field '{$field}' value: " . ($value ?? 'null'));

            foreach ($options as $optionValue => $cell) {
                if ($value === $optionValue) {
                    $worksheet->setCellValue($cell, 'X');
                    Log::info("  ✓ Cell {$cell} set to X for '{$optionValue}'");
                } else {
                    $worksheet->setCellValue($cell, '');
                }
            }
        }
    }
}
