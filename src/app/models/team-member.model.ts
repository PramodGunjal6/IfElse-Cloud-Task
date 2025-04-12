export interface Team {
    text_color: string;
    background_color: string;
    value: string;
  }
  
  export interface Name {
    first_name: string;
    last_name: string;
    handle: string;
  }
  
  export interface TeamMember {
    id: string;
    email: string;
    license_used: number;
    name: Name | string;
    role: string;
    status: string;
    teams: Team[] ;
  }
  
  export interface GridColumn {
    column_key: string;
    column_name: string;
    type: string;
    align: string;
  }