export const TEST_PUBLIC_KEY = 'tokn_sample_public'
export const TEST_SECRET_KEY = 'tokn_sample_secret'

export const SUBMIT_APP_DATA = {
  productId: 'prod_contractor',
  basicData: {
    contract_value: 10000000,
    existing_property_value: 3000000,
    gross_floor_area: 15000,
    project_type: 'Residential',
    contractor_grade: 'A'
  },
  packageOptions: null,
  additionalData: {
    principal: {
      name: 'บริษัท ผู้ว่าจ้าง จำกัด',
      address: {
        address_no: '1',
        moo: '2',
        village: 'วิลเลจ 3',
        alley: '',
        lane: 'ลาดพร้าว 4',
        street: 'ลาดพร้าว',
        minor_district: '',
        subdistrict: 'จอมพล',
        district: 'จตุจักร',
        province: 'กรุงเทพมหานคร',
        postal_code: '10900'
      }
    },
    contractor: {
      name: 'บริษัท ผู้รับเหมา จำกัด',
      title: 'นาย',
      first_name: 'สมชาย',
      last_name: 'สายชม',
      tax_id: '1111111111119',
      branch: 'สมุทรปราการ',
      phone: '0811111111',
      email: 'somchai@email.com',
      address: {
        address_no: '1',
        moo: '2',
        village: 'วิลเลจ 3',
        alley: '',
        lane: 'ลาดพร้าว 4',
        street: 'ลาดพร้าว',
        minor_district: '',
        subdistrict: 'จอมพล',
        district: 'จตุจักร',
        province: 'กรุงเทพมหานคร',
        postal_code: '10900'
      }
    },
    delivery: {
      name: 'นายสมชาย สายชม',
      policy_postal: false,
      address: {
        address_no: '1',
        moo: '2',
        village: 'วิลเลจ 3',
        alley: '',
        lane: 'ลาดพร้าว 4',
        street: 'ลาดพร้าว',
        minor_district: '',
        subdistrict: 'จอมพล',
        district: 'จตุจักร',
        province: 'กรุงเทพมหานคร',
        postal_code: '10900'
      }
    },
    project_name: 'โครงการ อโครบิวดิ้ง',
    project_site: {
      subdistrict: 'จอมพล',
      district: 'จตุจักร',
      province: 'กรุงเทพมหานคร'
    },
    project_effective_date: '2018-10-01T00:00:00+07:00',
    project_expiry_date: '2019-10-01T00:00:00+07:00',
    project_duration: 365,
    warranty_duration: 5,
    warranty_expiry_date: '2018-10-06T00:00:00Z',
    payment_type: 'ONLINE',
    policy_code: '',
    files: null
  }
}

export const CONFIRM_APP_DATA = {
  productId: 'prod_fire',
  basicData: {
    building_area_sq_m: 100,
    building_material: 'FULL_CONCRETE',
    building_type: 'SINGLE_HOUSE',
    coverage_year: 1,
    effective_date: '2018-10-02'
  },
  packageOptions: null,
  additionalData: {
    is_insured_building_owner: true,
    building_address: {
      address_no: '1',
      moo: '2',
      village: 'วิลเลจ 3',
      alley: '',
      lane: 'ลาดพร้าว 4',
      street: 'ลาดพร้าว',
      minor_district: '',
      subdistrict: 'จอมพล',
      district: 'จตุจักร',
      province: 'กรุงเทพมหานคร',
      postal_code: '10900'
    },
    building_roof_structure: 'เหล็ก',
    building_roof_type: 'กระเบื้อง',
    building_second_floor_type: '',
    building_total_floors: 2,
    insured_person: {
      type: '1',
      title: 'นาย',
      first_name: 'มานะ',
      last_name: 'มุ่งมั่น',
      birthdate: '1988-10-14',
      id_card: '1489900087857',
      branch_name: '',
      address: null,
      phone: '0861234567',
      email: 'customer@example.com',
      custom_beneficiary: false,
      beneficiary_person: null
    },
    other_insured_person_1: null
  }
}
