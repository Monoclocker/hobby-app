namespace dotnetWebAPI.DTO
{
    public class GroupCoordinates
    {
        public string username { get; set; } = default!;
        public List<float> coordinates { get; set; } = default!;
    }
}
