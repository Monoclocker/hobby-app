using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InterestsController : ControllerBase
    {
        IDbContext dbContext;

        public InterestsController(IDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<string>> GetAllInterests()
        {

            List<Interest> _interests = await dbContext.Interests.ToListAsync();
            List<string> interests = new();


            foreach (var interest in _interests)
            {
                interests.Add(interest.Name);
            }

            IEnumerable<string> result = interests.ToArray();

            return result;
        }
    }
}
