﻿namespace dotnetWebAPI.DTO
{
    public class GroupCreationDTO
    {
        public int? id {  get; set; }
        public required string groupName { get; set; }

        public bool isAdmin { get; set; } = false;
    }
}
