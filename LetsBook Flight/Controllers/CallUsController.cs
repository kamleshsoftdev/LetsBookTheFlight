using Microsoft.AspNetCore.Mvc;

namespace LetsBook_Flight.Controllers
{
    public class CallUsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult NewsLetterSubscription(string emailId, string source_)
        { 
        string success = string.Empty;
            string email = emailId;
            string source = source_;

         return Json(success);
        }
    }
}
