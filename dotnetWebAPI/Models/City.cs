﻿namespace dotnetWebAPI.Models
{
    public class City
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public List<User> Profiles { get; set; } = new List<User>();
        
    }
}
