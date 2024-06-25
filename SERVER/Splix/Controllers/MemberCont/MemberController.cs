using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Splix.Data.Contexts;
using Splix.Data.Models;

namespace Splix.Controllers.MemberCont
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly DataContext _context;
        public MemberController(DataContext context)
        {
            _context = context;
        }

        // To get all member details
        [HttpGet]
        public async Task<ActionResult<List<Member>>> GetMembers()
        {
            var members = await _context.Members.ToListAsync();
            if(members == null) {  return NotFound("No members found."); }
            return Ok(members);
        }

    }
}
