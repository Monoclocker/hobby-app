namespace dotnetWebAPI.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required int Age { get; set; }
        
        public string? PhotoPath { get; set; }
        public string? About { get; set; }
        public int UserId { get; set; }
        public User UserNavigation = default!;

        public int CityID { get; set; }
        public City City { get; set; } = default!;

        public List<Interest> Interests = new List<Interest>(); 

    }
}
