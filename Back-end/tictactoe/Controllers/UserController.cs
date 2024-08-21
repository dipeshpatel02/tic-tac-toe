using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tictactoe.Model;

namespace tictactoe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.AppUser.ToListAsync();
        }

        [HttpPost]
        public IActionResult SaveUser(User user)
        {
            // Check if the user already exists based on the Email
            var existingUser = _context.AppUser.SingleOrDefault(u => u.Email == user.Email && u.Name==user.Name);

            if (existingUser != null)
            {

                // User exists, update the Wins count
                if(user.Wins!=0)
                    existingUser.Wins += 1;

                // Optionally update the Name if needed
                //existingUser.Name = user.Name;

                _context.AppUser.Update(existingUser);

                user.Wins = existingUser.Wins;
            }
            else
            {
                // User doesn't exist, create a new user
                _context.AppUser.Add(user);
            }

            // Save changes to the database
            _context.SaveChanges();

            return Ok(user);
        }

        [HttpGet("top-winners")]
        public IActionResult GetTopWinners()
        {
            var topWinners = _context.AppUser
                .OrderByDescending(u => u.Wins)  // Order by Wins in descending order
                .Take(10)  // Take the top 10
                .ToList();  // Execute the query and convert the result to a list

            return Ok(topWinners);
        }
    }
}
