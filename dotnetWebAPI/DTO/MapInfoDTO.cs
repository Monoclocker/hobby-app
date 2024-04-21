namespace dotnetWebAPI.DTO
{
    public class MapInfoDTO
    {
        public string username { get; set; } = default!;

        public List<float> coordinates { get; set; } = default!;

        public List<GroupCoordinates> friends { get; set; } = default!;

        public List<PlaceDTO> places { get; set; } = default!;

    }
}
