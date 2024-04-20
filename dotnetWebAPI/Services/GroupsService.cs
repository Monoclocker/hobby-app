using dotnetWebAPI.DTO;
using dotnetWebAPI.Exceptions;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Services
{
    public class GroupsService: IGroupsService
    {

        IDbContext dbContext;
        public GroupsService(IDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        //переписать асинхронно
        public async Task<List<GroupCreationDTO>> GetAllGroups(string userName)
        {
            

            IQueryable<Group> query = dbContext.Groups
                .AsNoTracking()
                .Where(x=>x.GroupUsers.Any(x=>x.Username == userName));

            List<GroupCreationDTO> collection = new List<GroupCreationDTO>();

            List<Group> groups = query.AsEnumerable().ToList();

            foreach(var element in groups)
            {
                collection.Add(new GroupCreationDTO() { groupName = element.Name, id = element.Id });
            }

            return collection;
        }


        public async Task CreateGroup(GroupCreationDTO dto, string creatorName)
        {
            Group newGroup = new Group() { Name = dto.groupName };

            User? creator = await dbContext.Users.FirstOrDefaultAsync(x=>x.Username == creatorName);

            if (creator == null)
            {
                throw new UnknownUserException();
            }

            newGroup.GroupUsers.Add(creator);

            dbContext.Groups.Add(newGroup);

            await dbContext.SaveChangesAsync();
        }

        public async Task AddToGroupById(string userName, int groupId)
        {
            Group? findedGroup = await dbContext.Groups.FirstOrDefaultAsync(x => x.Id == groupId);

            if (findedGroup == null)
            {
                throw new UnknownGroupException();
            }

            User? findedUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Username == userName);

            if (findedUser == null)
            {
                throw new UnknownUserException();
            }


            findedGroup.GroupUsers.Add(findedUser);

            await dbContext.SaveChangesAsync();
        }

        public async Task RemoveFromGroupById(string userName, int groupId)
        {
            Group? findedGroup = await dbContext.Groups.FirstOrDefaultAsync(x => x.Id == groupId);

            if (findedGroup == null)
            {
                throw new UnknownGroupException();
            }

            User? findedUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Username == userName);

            if (findedUser == null)
            {
                throw new UnknownUserException();
            }


            findedGroup.GroupUsers.Remove(findedUser);

            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteGroupById(int id)
        {
            Group? findedGroup = await dbContext.Groups.FirstOrDefaultAsync(x => x.Id == id);

            if (findedGroup == null)
            {
                throw new UnknownGroupException();
            }

            dbContext.Groups.Remove(findedGroup);

            await dbContext.SaveChangesAsync();
        }

        public async Task<List<string>> GetGroupParticipants(int groupId)
        {
            Group? group = await dbContext.Groups.FirstOrDefaultAsync(x => x.Id == groupId);

            if (group == null)
            {
                throw new UnknownGroupException();
            }

            var participants = new List<string>();

            foreach (var  participant in group.GroupUsers) 
            {
                participants.Add(participant.Username);
            }

            return participants;
        }

    }
}
