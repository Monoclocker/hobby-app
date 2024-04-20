namespace dotnetWebAPI.Models
{
    public class City
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public List<Profile> Profiles { get; set; } = new List<Profile>();
        
    }
}
