export interface Group{
    id: string;
    name: string;
}

export interface GroupList{
    name: string;
    groups: Group[];
}

export const GROUPS: Group[] = [  
    {name: 'FrontEnd Enginner', id:'1'},
    {name: 'Backend Enginner', id:'2'},
    {name: 'Project Manager', id:'3'},
    {name: 'DevOps Enginner',id:'4'},
    {name: 'Software Tester', id:'5'},
    {name: 'IOS Dev', id: '6'},
    {name: 'UI/UX Designer',id: '7'},
    {name: 'Head of Comunication', id:'8'},
    {name: 'Head of IT Research', id:'9'},
    {name: 'Human Resource',id:'10'}
    
];