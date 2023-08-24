using System;
using System.ComponentModel.DataAnnotations;

namespace CrudApi.Models
{
    public class PersonCreateDto
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }
    }
}

