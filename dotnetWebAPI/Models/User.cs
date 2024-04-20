namespace dotnetWebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public DateTime SecurityTimeStamp { get; set; }
        public bool IsBlocked { get; set; }
        public List<Group> Groups { get; set; } = new List<Group>();
        public Profile? Profile { get; set; }

    }
}
