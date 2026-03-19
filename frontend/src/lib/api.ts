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
    AllProjectResponseType,
    AllProjectPayloadType,
    CreateProjectPayloadType,
    ProjectResponseType,
    EditProjectPayloadType,
    ProjectByIdPayloadType,
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
export const createProjectMutationFn = async ({
    workspaceId,
    data,
}: CreateProjectPayloadType): Promise<ProjectResponseType> => {
    const response = await API.post(
        `/projects/workspace/${workspaceId}/create`,
        data,
    );
    return response.data;
};

export const getProjectsInWorkspaceQueryFn = async ({
    workspaceId,
    pageSize = 10,
    pageNumber = 1,
}: AllProjectPayloadType): Promise<AllProjectResponseType> => {
    const response = await API.get(
        `/projects/workspace/${workspaceId}/all?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    return response.data;
};

export const editProjectMutationFn = async ({
    projectId,
    workspaceId,
    data,
}: EditProjectPayloadType): Promise<ProjectResponseType> => {
    const response = await API.put(
        `/projects/${projectId}/workspace/${workspaceId}/update`,
        data,
    );
    return response.data;
};

export const getProjectByIdQueryFn = async ({
    workspaceId,
    projectId,
}: ProjectByIdPayloadType): Promise<ProjectResponseType> => {
    const response = await API.get(
        `/projects/${projectId}/workspace/${workspaceId}`,
    );
    return response.data;
};

export const getProjectAnalyticsQueryFn = async ({
    workspaceId,
    projectId,
}: ProjectByIdPayloadType): Promise<AnalyticsResponseType> => {
    const response = await API.get(
        `/projects/${projectId}/workspace/${workspaceId}/analytics`,
    );
    return response.data;
};

export const deleteProjectMutationFn = async ({
    workspaceId,
    projectId,
}: ProjectByIdPayloadType): Promise<{
    message: string;
}> => {
    const response = await API.delete(
        `/projects/${projectId}/workspace/${workspaceId}/delete`,
    );
    return response.data;
};

//*******TASKS ********************************
//************************* */

export const createTaskMutationFn = async () => {};

export const getAllTasksQueryFn = async () => {};

export const deleteTaskMutationFn = async () => {};
