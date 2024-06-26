﻿namespace dotnetWebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = default!;
        public required int Age { get; set; }
        public string? Photo { get; set; }
        public string? About { get; set; }
        public int CityID { get; set; }
        public City City { get; set; } = default!;
        public required string Password { get; set; }
        public required string Email { get; set; }
        public List<Group> Groups { get; set; } = new List<Group>();
        public List<Interest> Interests { get; set; } = new List<Interest>();
        public List<SocialLink> SocialLinks { get; set; } = new List<SocialLink>();
        public List<GroupsUsers> GroupsUsers { get; set; } = new List<GroupsUsers>();
        public LastCoordinates? LastCoordinates { get; set; }

    }
}
