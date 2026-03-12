import { NotFoundException, UnauthorizedException } from "../utils/appErr-util";
import MemberModel from "../models/member-model";
import WorkspaceModel from "../models/workspace-model";

export const getMemberRoleInWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const member = await MemberModel.findOne({
    userId,
    workspaceId,
  }).populate("role");

  if (!member) {
    throw new UnauthorizedException(
      "You are not a member of this workspace",
      "ACCESS_UNAUTHORIZED"
    );
  }

  const roleName = member.role?.name;

  return { role: roleName };
};