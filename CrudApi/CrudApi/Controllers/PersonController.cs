using CrudApi.Models;
using CrudApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CrudApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IPersonRepository _personRepository;

    public PersonController(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Person>>> GetAllPeople()
    {
        var people = await _personRepository.GetAllPeople();
        return Ok(people);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Person>> GetPersonById(int id)
    {
        var person = await _personRepository.GetPersonById(id);
        if (person == null)
        {
            return NotFound();
        }
        return Ok(person);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePerson(Person person)
    {
        if (person == null)
        {
            return BadRequest();
        }

        await _personRepository.AddPerson(person);

        return CreatedAtAction(nameof(GetPersonById), new { id = person.Id }, person);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePerson(int id, Person person)
    {
        if (id != person.Id)
        {
            return BadRequest();
        }

        await _personRepository.UpdatePerson(person);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePerson(int id)
    {
        var person = await _personRepository.GetPersonById(id);
        if (person == null)
        {
            return NotFound();
        }

        await _personRepository.DeletePerson(id);

        return NoContent();
    }
}