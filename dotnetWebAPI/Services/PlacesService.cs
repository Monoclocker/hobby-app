using dotnetWebAPI.DTO;
using dotnetWebAPI.Exceptions;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Services
{
    public class PlacesService: IPlacesService
    {
        IDbContext context;
        public PlacesService(IDbContext context) 
        {
            this.context = context;
        }

        public async Task CreatePlace(PlaceDTO dto)
        {
            Place newPlace = new Place()
            {
                Name = dto.name,
                Latitude = dto.coordinates[0],
                Longtitude = dto.coordinates[1]
            };

            foreach (string interestName in dto.interests)
            {
                newPlace.Interests.Add(context.Interests.Single(x => x.Name == interestName));
            }

            context.Places.Add(newPlace);

            await context.SaveChangesAsync();
        }

        public async Task<List<PlaceDTO>> GetAllPlaces()
        {
            List<Place> places = await context.Places.Include(x => x.Interests).AsNoTracking().ToListAsync();

            List<PlaceDTO> result = new List<PlaceDTO>();

            foreach(Place place in places)
            {
                PlaceDTO element = new PlaceDTO() { name = place.Name, coordinates = [place.Latitude, place.Longtitude] };

                foreach (Interest interest in place.Interests)
                {
                    element.interests.Add(interest.Name);
                }

                result.Add(element);
            }

            return result;
        }

        public async Task<List<PlaceDTO>> GetPlaces(string username)
        {
            List<Place> places = await context.Places.Include(x=>x.Interests).AsNoTracking().ToListAsync();

            User? user = await context.Users.FirstOrDefaultAsync(x=>x.Username == username);

            if (user == null)
            {
                throw new UnknownUserException();
            }

            List<string> interests = new List<string>();

            foreach (var interest in user.Interests) 
            {
                interests.Add(interest.Name);
            }

            List<PlaceDTO> result = new ();

            places.RemoveAll(x => !x.Interests.Exists(x => interests.Contains(x.Name)));

            foreach(Place place in places) 
            {

                List<string> interestsOfPlace = new List<string>();

                PlaceDTO element = new PlaceDTO()
                {
                    name = place.Name,
                    coordinates = [place.Latitude, place.Longtitude]
                };

                foreach (Interest interest in place.Interests) 
                {
                    interestsOfPlace.Add(interest.Name);
                }

                element.interests = interestsOfPlace;

                result.Add(element);

            }

            return result;
        }

        public async Task DeletePlace(int id)
        {
            var deleted = await context.Places.FirstAsync(x => x.Id == id);

            context.Places.Remove(deleted);

            await context.SaveChangesAsync();
        }

    }
}
