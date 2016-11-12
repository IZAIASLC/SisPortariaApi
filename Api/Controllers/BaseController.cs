using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Api.Controllers
{
    public class BaseController : ApiController
    {
        public HttpResponseMessage ResponseMessage;

        public BaseController()
        {
            this.ResponseMessage = new HttpResponseMessage();
        }

        public Task<HttpResponseMessage> CreateResponse(HttpStatusCode code, object result)
        {
            ResponseMessage = Request.CreateResponse(code, result);

            return Task.FromResult<HttpResponseMessage>(ResponseMessage);
        }
    }

  
}
