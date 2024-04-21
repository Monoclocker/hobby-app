using dotnetWebAPI.DTO;

namespace dotnetWebAPI.Interfaces
{
    public interface IGroupsService
    {
        Task<List<GroupCreationDTO>> GetAllGroups(string userName);

        Task CreateGroup(GroupCreationDTO dto, string creatorName);

        Task AddToGroupById(string userName, int groupId);

        Task RemoveFromGroupById(string userName, int groupId);

        Task DeleteGroupById(int id); 

        Task<List<string>> GetGroupParticipants(int groupId);

        Task<List<GroupCoordinates>> GetGroupCoordinatesByUsername(string username);

    }
}
