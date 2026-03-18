import API from "./axios-client";
import {
    CurrentUserResponseType,
    loginType,
    LoginResponseType,
    registerType,
    AllWorkspaceResponseType,
    WorkspaceByIdResponseType,
    CreateWorkspaceType,
    CreateWorkspaceResponseType,
    EditWorkspaceType,
    AnalyticsResponseType,
    ChangeWorkspaceMemberRoleType,
    AllMembersInWorkspaceResponseType,
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

export const createWorkspaceMutationFn = async (
    data: CreateWorkspaceType,
): Promise<CreateWorkspaceResponseType> => {
    const response = await API.post(`/workspaces/create/new`, data);
    return response.data;
};

export const editWorkspaceMutationFn = async ({
    workspaceId,
    data,
}: EditWorkspaceType) => {
    const response = await API.put(`/workspaces/update/${workspaceId}`, data);
    return response.data;
};

export const getWorkspaceAnalyticsQueryFn = async (
    workspaceId: string,
): Promise<AnalyticsResponseType> => {
    const response = await API.get(`/workspaces/analytics/${workspaceId}`);
    return response.data;
};

export const changeWorkspaceMemberRoleMutationFn = async ({
    workspaceId,
    data,
}: ChangeWorkspaceMemberRoleType) => {
    const response = await API.put(
        `/workspaces/change/member/role/${workspaceId}`,
        data,
    );
    return response.data;
};

export const deleteWorkspaceMutationFn = async (
    workspaceId: string,
): Promise<{
    message: string;
    currentWorkspace: string;
}> => {
    const response = await API.delete(`/workspaces/delete/${workspaceId}`);
    return response.data;
};

export const getMembersInWorkspaceQueryFn = async (
    workspaceId: string,
): Promise<AllMembersInWorkspaceResponseType> => {
    const response = await API.get(`/workspaces/members/${workspaceId}`);
    return response.data;
};

//*******MEMBER ****************

export const invitedUserJoinWorkspaceMutationFn = async (
    inviteCode: string,
): Promise<{
    message: string;
    workspaceId: string;
}> => {
    const response = await API.post(`/members/workspace/${inviteCode}/join`);
    return response.data;
};

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
