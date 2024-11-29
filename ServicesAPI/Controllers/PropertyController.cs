using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PropertyController : ControllerBase
{
    private readonly IService<Property> _propertyService;

    public PropertyController(IService<Property> propertyService)
    {
        _propertyService = propertyService;
    }

    // GET: api/Property
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
    {
        var properties = await _propertyService.GetAllAsync();
        return Ok(properties);
    }

    // GET: api/Property/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Property>> GetProperty(int id)
    {
        var property = await _propertyService.GetByIdAsync(id);
        if (property == null)
            return NotFound();

        return Ok(property);
    }

    // POST: api/Property
    [HttpPost]
    public async Task<ActionResult<Property>> CreateProperty(Property property)
    {
        var createdProperty = await _propertyService.CreateAsync(property);
        return CreatedAtAction(nameof(GetProperty), new { id = createdProperty.Id }, createdProperty);
    }

    // PUT: api/Property/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProperty(int id, Property property)
    {
        var updatedProperty = await _propertyService.UpdateAsync(id, property);
        if (updatedProperty == null)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/Property/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProperty(int id)
    {
        var isDeleted = await _propertyService.DeleteAsync(id);
        if (!isDeleted)
            return NotFound();

        return NoContent();
    }
}
