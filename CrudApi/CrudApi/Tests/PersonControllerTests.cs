using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using CrudApi.Controllers;
using CrudApi.Models;
using CrudApi.Repositories;

namespace CrudApi.Tests
{
    [TestClass]
    public class PersonControllerTests
    {
        private Mock<IPersonRepository> _mockPersonRepository;
        private PersonController _personController;

        [TestInitialize]
        public void Setup()
        {
            _mockPersonRepository = new Mock<IPersonRepository>();
            _personController = new PersonController(_mockPersonRepository.Object);
        }

        [TestMethod]
        public async Task CreatePerson_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var newPerson = new Person { FirstName = "John", LastName = "Doe", Email = "john@example.com" };
            var newPerson2 = new Person { FirstName = "Jane", LastName = "Smith", Email = "jane@example.com" };

            // Act
            var result = await _personController.CreatePerson(newPerson);

            // Assert
            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);

            Assert.AreEqual(nameof(PersonController.GetPersonById), createdAtActionResult.ActionName);
            Assert.AreEqual(newPerson.Id, createdAtActionResult.RouteValues["id"]);

            var actualPerson = createdAtActionResult.Value as Person;
            Assert.AreEqual(newPerson.FirstName, actualPerson.FirstName);
            Assert.AreEqual(newPerson.LastName, actualPerson.LastName);
            Assert.AreEqual(newPerson.Email, actualPerson.Email);

            _mockPersonRepository.Verify(repo => repo.AddPerson(It.IsAny<Person>()), Times.Once);
        }

        [TestMethod]
        public async Task GetAllPeople_ReturnsOkResultWithPeople()
        {
            // Arrange
            var expectedPeople = new List<Person>
            {
                new Person { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com" },
                new Person { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "James@example.com" }
            };
            _mockPersonRepository.Setup(repo => repo.GetAllPeople()).ReturnsAsync(expectedPeople);

            // Act
            var result = await _personController.GetAllPeople();

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var actualPeople = okResult.Value as List<Person>;
            CollectionAssert.AreEqual(expectedPeople, actualPeople);
        }

        [TestMethod]
        public async Task GetPersonById_ReturnsOkResultWithPerson()
        {
            // Arrange
            var expectedPerson = new Person { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com" };
            _mockPersonRepository.Setup(repo => repo.GetPersonById(expectedPerson.Id)).ReturnsAsync(expectedPerson);

            // Act
            var result = await _personController.GetPersonById(expectedPerson.Id);

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var actualPerson = okResult.Value as Person;
            Assert.IsNotNull(actualPerson);

            Assert.AreEqual(expectedPerson.Id, actualPerson.Id);
            Assert.AreEqual(expectedPerson.FirstName, actualPerson.FirstName);
            Assert.AreEqual(expectedPerson.LastName, actualPerson.LastName);
            Assert.AreEqual(expectedPerson.Email, actualPerson.Email);
        }

        [TestMethod]
        public async Task UpdatePerson_ReturnsNoContentResult()
        {
            // Arrange
            var updatedPerson = new Person { Id = 1, FirstName = "Updated", LastName = "Person", Email = "updated@example.com" };

            // Act
            var result = await _personController.UpdatePerson(updatedPerson.Id, updatedPerson);

            // Assert
            var noContentResult = result as NoContentResult;
            Assert.IsNotNull(noContentResult);

            _mockPersonRepository.Verify(repo => repo.UpdatePerson(It.IsAny<Person>()), Times.Once);
        }

        [TestMethod]
        public async Task DeletePerson_ReturnsNoContentResult()
        {
            // Arrange
            var personIdToDelete = 1;
            _mockPersonRepository.Setup(repo => repo.GetPersonById(personIdToDelete)).ReturnsAsync(new Person { Id = personIdToDelete });

            // Act
            var result = await _personController.DeletePerson(personIdToDelete);

            // Assert
            var noContentResult = result as NoContentResult;
            Assert.IsNotNull(noContentResult);

            _mockPersonRepository.Verify(repo => repo.DeletePerson(personIdToDelete), Times.Once);
        }

        [TestMethod]
        public async Task DeletePerson_ReturnsNotFoundResult()
        {
            // Arrange
            var nonExistentPersonId = 999;
            _mockPersonRepository.Setup(repo => repo.GetPersonById(nonExistentPersonId)).ReturnsAsync((Person)null);

            // Act
            var result = await _personController.DeletePerson(nonExistentPersonId);

            // Assert
            var notFoundResult = result as NotFoundResult;
            Assert.IsNotNull(notFoundResult);

            _mockPersonRepository.Verify(repo => repo.DeletePerson(nonExistentPersonId), Times.Never);
        }
    }
}
