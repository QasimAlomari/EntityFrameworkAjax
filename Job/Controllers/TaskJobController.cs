using Job.Data;
using Job.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Job.Controllers
{
    public class TaskJobController : Controller
    {
        // GET: TaskJobController
        private readonly AppDbContext db;
        public TaskJobController(AppDbContext _db)
        {
            db = _db;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> TaskListJson()
        {
            try
            {
                var data = await db.TaskJob.ToListAsync();
                return Json(data);
            }
            catch (Exception ex)
            {
                return Json(new { error = "An error occurred while fetching the data." });
            }
        }


        [HttpPost]
        public ActionResult CreateTask([FromBody] TaskJob entity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model state");
                }
                else
                {
                    var data = new TaskJob()
                    {
                        TaskName = entity.TaskName,
                        TaskDescription = entity.TaskDescription,
                    };

                    db.TaskJob.Add(data);
                    db.SaveChanges();
                    return Ok(new { success = true, message = "Data is Saved" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet]
        public JsonResult DeleteTask(int id)
        {
            var data = db.TaskJob.FirstOrDefault(x => x.TaskJobId == id);

            if (data != null)
            {
                db.TaskJob.Remove(data);
                db.SaveChanges();
                return Json("Data Deleted");
            }
            else
            {
                return Json("Task not found");
            }
        }

        [HttpGet]
        public JsonResult DetailsTask(int id)
        {
            var data = db.TaskJob.FirstOrDefault(x => x.TaskJobId == id);

            if (data != null)
            {
                return Json(data);
            }
            else
            {
                return Json("Task not found");
            }
        }

        [HttpGet]
        public JsonResult EditTask(int id)
        {
            var data = db.TaskJob.FirstOrDefault(x => x.TaskJobId == id);

            if (data != null)
            {
                return Json(data);
            }
            else
            {
                return Json("Task not found");
            }
        }

        [HttpPut]
        public JsonResult UpdateTask([FromBody] TaskJob entity)
        {
            if (ModelState.IsValid)
            {
                db.TaskJob.Update(entity);
                db.SaveChanges();
                return Json("Record Updated !");
            }
            else
            {
                return Json("Invalid model state");
            }
        }


    }
}
