namespace dotnetWebAPI.Models
{
    public class Group
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public List<User> GroupUsers { get; set; } = new List<User>();
        public List<GroupsUsers> GroupsUsers { get; set; } = new List<GroupsUsers>();
    }
}
