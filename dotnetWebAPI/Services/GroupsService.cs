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
            User? user = await dbContext.Users
                .Include(x => x.GroupsUsers)
                .FirstOrDefaultAsync(x => x.Username == userName);

            if (user == null)
            {
                throw new UnknownUserException();
            }

            List<GroupsUsers> query = user.GroupsUsers.ToList();

            List<GroupCreationDTO> collection = new List<GroupCreationDTO>();


            foreach (var element in query)
            {

                bool isAdmin = element.IsAdmin;

                Group group = await dbContext.Groups.FirstAsync(x => x.Id == element.GroupId);

                collection.Add(new GroupCreationDTO() { groupName = group.Name, id = group.Id, isAdmin = isAdmin });
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

            creator.GroupsUsers.Add(new GroupsUsers() { Group = newGroup, IsAdmin = true, User = creator });

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

            findedUser.GroupsUsers.Add(new GroupsUsers() { Group = findedGroup, IsAdmin = false, User = findedUser });

            await dbContext.SaveChangesAsync();
        }

        public async Task RemoveFromGroupById(string userName, int groupId)
        {
            Group? findedGroup = await dbContext.Groups.Include(x=>x.GroupUsers).FirstOrDefaultAsync(x => x.Id == groupId);

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
            Group? group = await dbContext.Groups.Include(x=>x.GroupUsers).FirstOrDefaultAsync(x => x.Id == groupId);

            if (group == null)
            {
                throw new UnknownGroupException();
            }

            var participants = new List<string>();

            foreach (var participant in group.GroupUsers) 
            {
                participants.Add(participant.Username);
            }

            return participants;
        }

        public async Task<List<GroupCoordinates>> GetGroupCoordinatesByUsername(string username)
        {
            var user = await dbContext.Users
                .Include(x => x.Groups)
                .Include(x => x.GroupsUsers)
                .FirstOrDefaultAsync(x=>x.Username == username);

            if(user == null)
            {
                throw new UnknownUserException();
            }

            int upperBound = user.Groups.Count;

            if (upperBound == 0) 
            {
                return new List<GroupCoordinates>();
            }

            Random rng = new Random(); //blessmerng

            int number = rng.Next(0, upperBound);

            int randomedGroupId = user.Groups[number].Id;

            Group group = await dbContext.Groups
                .Include(x=>x.GroupUsers)
                .ThenInclude(x=>x.LastCoordinates)
                .FirstAsync(x=>x.Id==randomedGroupId);

            List<GroupCoordinates> result = new List<GroupCoordinates>();


            foreach(var userIter in group.GroupUsers) 
            {

                if(user.Id == userIter.Id)
                {
                    continue;
                }

                GroupCoordinates coordinates = new GroupCoordinates()
                {
                    username = userIter.Username,
                    coordinates = [(float)userIter.LastCoordinates!.Latitude!, (float)userIter.LastCoordinates!.Longitude!]
                };

                result.Add(coordinates);

            }

            return result;

        }
    }
}
