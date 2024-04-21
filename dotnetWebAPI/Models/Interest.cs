namespace dotnetWebAPI.Models
{
    public class Interest
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public List<User> Profiles { get; set; } = new List<User>();

        public List<Place> Places { get; set; } = new List<Place>();


    }
}
