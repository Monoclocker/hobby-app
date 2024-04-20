﻿namespace dotnetWebAPI.Models
{
    public class SocialLink
    {
        public int Id { get; set; }
        public required string Type { get; set; }
        public required string Link { get; set; }
        public Profile Profile { get; set; } = default!;
    }
}
