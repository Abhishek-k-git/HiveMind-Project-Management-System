import API from "./axios-client";
import {
    CurrentUserResponseType,
    loginType,
    LoginResponseType,
    registerType,
    AllWorkspaceResponseType,
    WorkspaceByIdResponseType,
} from "@/types/api.type";

export const loginMutationFn = async (
    data: loginType,
): Promise<LoginResponseType> => {
    const response = await API.post("/auth/login", data);
    return response.data;
};

export const registerMutationFn = async (data: registerType) =>
    await API.post("/auth/register", data);

export const logoutMutationFn = async () => await API.post("/auth/logout");

export const getCurrentUserQueryFn =
    async (): Promise<CurrentUserResponseType> => {
        const response = await API.get(`/users/current`);
        return response.data;
    };

//********* WORKSPACE ****************
//************* */

export const getAllWorkspacesUserIsMemberQueryFn =
    async (): Promise<AllWorkspaceResponseType> => {
        const response = await API.get(`/workspaces/all`);
        return response.data;
    };

export const getWorkspaceByIdQueryFn = async (
    workspaceId: string,
): Promise<WorkspaceByIdResponseType> => {
    const response = await API.get(`/workspaces/${workspaceId}`);
    return response.data;
};

export const createWorkspaceMutationFn = async () => {};

export const editWorkspaceMutationFn = async () => {};


export const getWorkspaceAnalyticsQueryFn = async () => {};

export const changeWorkspaceMemberRoleMutationFn = async () => {};

export const deleteWorkspaceMutationFn = async () => {};

//*******MEMBER ****************

export const invitedUserJoinWorkspaceMutationFn = async () => {};

//********* */
//********* PROJECTS
export const createProjectMutationFn = async () => {};

export const editProjectMutationFn = async () => {};

export const getProjectsInWorkspaceQueryFn = async () => {};

export const getProjectByIdQueryFn = async () => {};

export const getProjectAnalyticsQueryFn = async () => {};

export const deleteProjectMutationFn = async () => {};

//*******TASKS ********************************
//************************* */

export const createTaskMutationFn = async () => {};

export const getAllTasksQueryFn = async () => {};

export const deleteTaskMutationFn = async () => {};
