<?php

return [
    /*
    |--------------------------------------------------------------------------
    | PDS Cell Mapping
    |--------------------------------------------------------------------------
    */
    'worksheets' => [
        // Sheet C1: Personal Information
  'C1' => [
    // ✅ Use camelCase to match the relationship method
    'D10' => 'personalInformation.surname',
    'D11' => 'personalInformation.first_name',
    'D12' => 'personalInformation.middle_name',
    'L11' => 'personalInformation.extension_name',
    'D13' => 'personalInformation.birth_date',
    'D15' => 'personalInformation.birth_place',
    'D22' => 'personalInformation.height',
    'D24' => 'personalInformation.weight',
    'D25' => 'personalInformation.blood_type',
    'D27' => 'personalInformation.philsys_no',
    'D29' => 'personalInformation.pagibig_no',
    'D31' => 'personalInformation.philhealth_no',
    'D32' => 'personalInformation.philsys_no',
    'D33' => 'personalInformation.tin_no',
    'D34' => 'personalInformation.agency_employee_no',
    'I32' => 'personalInformation.telephone',
    'I33' => 'personalInformation.mobile',
    'I34' => 'user.email',

    // Checkbox fields – also update the field key
    'sex' => [
        'type' => 'checkbox',
        'field' => 'personalInformation.sex',   // ✅ camelCase
        'options' => [
            'Male' => 'D16',
            'Female' => 'E16',
        ],
    ],
    'civil_status' => [
        'type' => 'checkbox',
        'field' => 'personalInformation.civil_status',   // ✅ camelCase
        'options' => [
            'Single' => 'D17',
            'Married' => 'E17',
            'Widowed' => 'F17',
            'Separated' => 'G17',
            'Divorced' => 'H17',
        ],
    ],
    'citizenship' => [
        'type' => 'checkbox',
        'field' => 'personalInformation.citizenship',   // ✅ camelCase
        'options' => [
            'Filipino' => 'J13',
        ],
    ],
],
    ],
];
