export interface Todo {
    id: string;
    value: string;
    priority: string;
    category: string;
    dueDate: string | null;
    assignee: string | null;
    status: string;
    isStarred: boolean;
    comments: Comment[];
    createdAt: Date;
  }
  
  export interface Comment {
    id: string;
    text: string;
    timestamp: Date;
  }
  
  export interface TodoFilter {
    priority: string;
    category: string;
    status: string;
  }
  
  export interface Category {
    id: string;
    label: string;
    icon: any;
  }
  
  export interface Priority {
    id: string;
    color: string;
    label: string;
  }
  
  export interface Status {
    id: string;
    label: string;
    color: string;
  }
  
  export interface TeamMember {
    id: string;
    name: string;
  }