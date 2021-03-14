type BasicQuery = {
  id: string;
  name: string;
};

type Github = {
  name: string;
  accountId: number;
  avatar_url: string;
  bio: string;
  company: string;
  created_at: string;
  email: string;
  id: number;
  location: string;
  login: string;
};

interface Team extends BasicQuery {
  members: Me[];
}

type UserDetails = {
  id: string;
  role: BasicQuery;
  teams: Team[];
};

export type KnowledgeMatriz = {
  id: string;
  name: string;
  matrizLevel?: number;
};

export type KnowledgeArea = {
  id: string;
  name: string;
  skills: Skill[];
};

type KnowledgeSkillDetails = {
  id: string;
  knowledgeSkill: BasicQuery;
  knowledgeMatriz: KnowledgeMatriz;
};

type KnowledgeGapsDetails = {
  id: string;
  knowledgeSkill: BasicQuery;
};

type GrowMap = {
  id: string;
  userDetails: UserDetails;
  knowledgeSkillDetails: KnowledgeSkillDetails[];
  knowledgeGapsDetails: KnowledgeGapsDetails[];
};

export type Me = {
  id: string;
  github: Github;
  growMap?: GrowMap;
};

export enum Languages {
  pt_BR = 'pt_BR',
  en_US = 'en_US',
}

export enum Types {
  EDIT_LANGUAGE = 'EDIT_LANGUAGE',
  EDIT_KNOWLEDGE_DATA = 'EDIT_KNOWLEDGE_DATA',
  EDIT_SEARCH = 'EDIT_SEARCH',
  EDIT_SELECTED_SKILLS = 'EDIT_SELECTED_SKILLS',
  SET_GET_STARTED_DATA = 'SET_GET_STARTED_DATA',
  SET_KNOWLEDGE_GAPS_DATA = 'SET_KNOWLEDGE_GAPS_DATA',
  SET_LOGGED_USER = 'SET_LOGGED_USER',
  SET_LOGOUT = 'SET_LOGOUT',
  SET_SKILLS_DATA = 'SET_SKILLS_DATA',
  UPDATE_STEP = 'UPDATE_STEP',
}

export interface IWrappedComponentProps
  extends React.HTMLAttributes<HTMLElement> {
  displayName?: string;
}

export type Action = {
  payload: any;
  type: any;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ActionsPayload = {
  [Types.EDIT_LANGUAGE]: Languages;
  [Types.EDIT_SEARCH]: string;
  [Types.EDIT_SELECTED_SKILLS]: SelectedSkills[];
  [Types.EDIT_KNOWLEDGE_DATA]: {
    area: KnowledgeArea[];
    matriz: KnowledgeMatriz[];
  };
  [Types.SET_LOGGED_USER]: {
    token: string;
  };
  [Types.SET_LOGOUT]: string;
  [Types.SET_GET_STARTED_DATA]: string;
  [Types.SET_SKILLS_DATA]: SelectedSkills[];
  [Types.SET_KNOWLEDGE_GAPS_DATA]: SelectedSkills[];
  [Types.UPDATE_STEP]: {
    checked: boolean;
    value: string;
  };
};

export type allOffice = {
  id: string;
  name: string;
  teams: {
    id: string;
    name: string;
  }[];
}[];

export type allRole = {
  id: string;
  name: string;
}[];

export type Portal = {
  languageId: Languages;
};

export type Skill = {
  id: string;
  name: string;
};

export type SelectedSkills = {
  knowledgeSkillId: string;
  knowledgeMatrizId?: string;
  isMentor?: boolean;
};

export type SkillManagement = {
  search?: string;
  knowledgeMatrizLevelAllowed?: boolean;
  selectedSkills?: SelectedSkills[];
  knowledgeArea?: KnowledgeArea[];
  knowledgeMatriz?: KnowledgeMatriz[];
};

export type User = {
  token: string | null;
  loggedUser: {
    name?: string;
    accountId?: number;
    avatar_url?: string;
    bio?: string;
    company?: string;
    created_at?: string;
    email?: string;
    id?: string;
    location?: string;
    login?: string;
    user?: {
      id: string;
      growMap: {
        id: string;
      } | null;
    };
  };
};

export type Steps = {
  checked: boolean;
  value: string;
}[];

export type Welcome = {
  steps: Steps;
  data: {
    knowledgeSkillDetails: SelectedSkills[];
    knowledgeGapsDetails: SelectedSkills[];
    userDetails?: UserDetails | null;
  };
};
