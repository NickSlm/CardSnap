using CardSnap.Dto;
using CardSnap.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CardSnap.Controllers
{
    public class UploadController : ControllerBase
    {
        private readonly IOcrService _ocrService;

        public UploadController(IOcrService ocrService)
        {
            _ocrService = ocrService;
        }

        [HttpPost("/data/upload/image")]
        public async Task<ActionResult> UploadImage([FromForm] UploadDto dto)
        {
            byte[] imageBytes;

            using (var memoryStream = new MemoryStream())
            {
                await dto.Image.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }
            var cardId = await _ocrService.ReadCardId(imageBytes);
            Console.WriteLine(cardId);


            return Ok(new { message = "sent" });
        }
    }
}
