using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Splix.Data.Contexts;
using Splix.Data.Dtos;
using Splix.Data.Models;

namespace Splix.Controllers.GroupCont
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly DataContext _context;

        public GroupController(DataContext context)
        {
            _context = context;
        }

        // To get all the groups
        [HttpGet]
        public async Task<ActionResult<List<Group>>> GetGroups()
        {
            var groups = await _context.Groups.Include(g => g.Members).ToListAsync();
            if(groups == null) { return NotFound(); }
            return groups;
        }

        // To get all members of a group by group id.
        [HttpGet("/{id}/members")]
        public async Task<ActionResult<List<Member>>> GetMembersByGroupId([FromRoute] int id)
        {
            var group = await _context.Groups.Include(g=>g.Members).FirstOrDefaultAsync(g=>g.Id==id);
            if(group == null) { return NotFound(); };
            return group.Members;
        }

        // To create new group 
        [HttpPost]
        public async Task<ActionResult<Group>> CreateGroup([FromBody] GroupDto newGroup)
        {
            if(newGroup == null || string.IsNullOrWhiteSpace(newGroup.Name)) { return BadRequest(); }

            var group = new Group { Name = newGroup.Name };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            var groupCreated = await _context.Groups.FirstOrDefaultAsync(g => g.Id == group.Id);

            return Ok(groupCreated);
        }

        // Add members to an existing group
        // Add members to an existing group
        [HttpPost("{groupId}/add-members")]
        public async Task<ActionResult<Group>> AddMembersToGroup(int groupId, [FromBody] List<int> memberIds)
        {
            var group = await _context.Groups.Include(g => g.Members).FirstOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
            {
                return NotFound("Group not found");
            }

            // Fetch members to be added from the database
            var membersToAdd = await _context.Members.Where(m => memberIds.Contains(m.Id)).ToListAsync();

            // Add new members to the group
            group.Members.AddRange(membersToAdd);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Handle any potential database update errors
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add members to the group");
            }

            // Return the updated group
            return Ok(group);
        }

    }
}
