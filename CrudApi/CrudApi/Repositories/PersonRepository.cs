using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CrudApi.Data;
using CrudApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly AppDbContext _context;

        public PersonRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Person>> GetAllPeople()
        {
            return await _context.People.ToListAsync();
        }

        public async Task<Person> GetPersonById(int id)
        {
            return await _context.People.FindAsync(id);
        }

        public async Task AddPerson(Person person)
        {
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePerson(Person person)
        {
            _context.Entry(person).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePerson(int id)
        {
            var person = await _context.People.FindAsync(id);
            if (person != null)
            {
                _context.People.Remove(person);
                await _context.SaveChangesAsync();
            }
        }
    }
}
