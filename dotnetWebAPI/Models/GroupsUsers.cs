namespace dotnetWebAPI.Models
{
    public class GroupsUsers
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = default!;
        public int GroupId { get; set; }
        public Group Group { get; set; } = default!;

        public bool IsAdmin { get; set; }


    }
}
