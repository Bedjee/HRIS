<?php

namespace App\Modules\ApplicantManagement\Services;

use App\Modules\ApplicantManagement\Models\Applicant;
use App\Modules\ApplicantManagement\Models\ApplicantDocument;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class DocumentService
{
    public function upload(Applicant $applicant, UploadedFile $file, string $documentType): ApplicantDocument
    {
        // Generate a safe file name
        $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file->getClientOriginalName());

        // Store in private storage
        $path = $file->storeAs(
            "applicants/{$applicant->id}/documents",
            $fileName,
            'private' // Use private disk (config/filesystems.php)
        );

        if (!$path) {
            throw new \RuntimeException('Failed to store file.');
        }

        return $applicant->documents()->create([
            'document_type' => $documentType,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'verified' => false,
        ]);
    }

    public function verify(ApplicantDocument $document, User $verifier, bool $verified, ?string $rejectionReason = null): void
    {
        $document->update([
            'verified' => $verified,
            'verified_by' => $verifier->id,
            'verified_at' => now(),
            'rejection_reason' => $verified ? null : $rejectionReason,
        ]);
    }

    public function delete(ApplicantDocument $document): void
    {
        Storage::disk('private')->delete($document->file_path);
        $document->delete(); // Soft delete
    }
}
