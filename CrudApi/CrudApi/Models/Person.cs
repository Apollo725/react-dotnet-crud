﻿using System;
using System.ComponentModel.DataAnnotations;

namespace CrudApi.Models
{
    public class Person
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }
    }
}
