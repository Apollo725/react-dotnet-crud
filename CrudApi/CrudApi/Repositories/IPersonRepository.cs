using System.Collections.Generic;
using System.Threading.Tasks;
using CrudApi.Models;

namespace CrudApi.Repositories
{
    public interface IPersonRepository
    {
        Task<IEnumerable<Person>> GetAllPeople();
        Task<Person> GetPersonById(int id);
        Task AddPerson(Person person);
        Task UpdatePerson(Person person);
        Task DeletePerson(int id);
    }
}
