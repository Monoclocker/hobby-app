namespace dotnetWebAPI.Models
{
    public class Profile
    {
        public string Username { get; set; } = default!;
        public required int Age { get; set; }
        
        public string? PhotoPath { get; set; }
        public string? About { get; set; }
        
        public User UserNavigation = default!;

        public int CityID { get; set; }
        public City City { get; set; } = default!;

        public List<Interest> Interests = new List<Interest>();
        public List<SocialLink> SocialLinks = new List<SocialLink>();

    }
}
