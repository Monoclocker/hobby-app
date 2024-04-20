namespace dotnetWebAPI.Models
{
    public class Interest
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public List<Profile> Profiles { get; set; } = new List<Profile>();
        public List<Group> Groups { get; set; } = new List<Group>(); 

    }
}
