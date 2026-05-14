using Google.GenAI;
using Google.GenAI.Types;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{

    [ApiController]
    [Route("airesponse")]
    public class FetchAIController : ControllerBase
    {
        static List<Message> MessageHistory = new List<Message>();
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] HeaderContent Contents)
        {

            var memoryStream = new MemoryStream();
            var content = new List<Part>();
            if (Contents.Status == 0)
            {
                await Contents.Image.CopyToAsync(memoryStream);
                content = new List<Part>{ Part.FromBytes(memoryStream.ToArray(), "image/jpeg"), Part.FromText($"Du er en profesjonell golfinstruktør som analyserer golfslag basert på bilde og/eller data.\r\n\r\nBrukeren bruker kølle: {Contents.Iron}\r\n\r\nOppgave:\r\nAnalyser bildet nøye. Det kan inneholde simulator- eller launch monitor-data som ball speed, club speed, smash factor, attack angle, face angle, spin rate, carry, launch og lignende. Bruk disse aktivt hvis de finnes.\r\n\r\nHvis bildet viser en faktisk sving, analyser teknikk, kroppsholdning og bevegelsesmønster.\r\n\r\nRegler:\r\nIkke anta informasjon som ikke er synlig i input (f.eks. høyre/venstrehendt spiller).\r\nIkke legg til ekstra kontekst eller historiefortelling.\r\nIkke skriv introduksjon eller avslutning.\r\nSvar direkte og teknisk.\r\n\r\nSpråk:\r\nNorsk.\r\n\r\nLengde:\r\nKort og effektivt. Maks 80–120 ord totalt.\r\n\r\nStruktur:\r\n1. Slagdata (bruk tabell hvis tall finnes)\r\n2. Kort analyse (maks 5–7 linjer)\r\n3. 1–3 konkrete forbedringspunkter\r\n\r\nFormatering:\r\nKun React Markdown-kompatibel Markdown.\r\nDu kan bruke **bold tekst**, punktlister og tabeller.\r\nIkke bruk bindestreker som visuell struktur (---, ----).\r\nIkke bruk kolonbasert layout (Parameter: Verdi).\r\nIkke lag ASCII-dekor eller visuelle skiller.\r\n\r\nMål:\r\nRen, profesjonell Trackman-lignende analyse som er lett å lese raskt. FORMAT RULES (STRICT):\r\n- Bruk kun React Markdown-kompatibel Markdown\r\n- IKKE bruk Markdown-tabeller\r\n- IKKE bruk ASCII tabeller\r\n- IKKE bruk linjer, streker eller dekorasjon\r\n- IKKE bruk \":\" for å lage key-value layout\r\n- Bruk kun:\r\n  • Bullet points\r\n  • **bold labels**\r\n  • korte avsnitt") };
            }
            else
            {
                var newList = MessageHistory.Where(m => m.UserID == Contents.UserID);
                var Earlyer = "";
                await Contents.Image.CopyToAsync(memoryStream);
                foreach (var m in newList) {
                    Earlyer += ($"{m.Writer}: {m.MessageText},");
                }
                content = new List<Part> { Part.FromText(Contents.Chat), Part.FromBytes(memoryStream.ToArray(), "image/jpeg"), Part.FromText($"Du er en profesjonell golfinstruktør som svarer på oppfølgingsspørsmål basert på tidligere analyse i samtalen.\r\n\r\nKontekst:\r\nTidligere meldinger i chatten: {Earlyer}\r\n\r\nRegler:\r\nBruk kun informasjon fra tidligere kontekst.\r\nIkke anta nye bilder, data eller kølleinformasjon med mindre brukeren eksplisitt gir det.\r\nIkke legg til ekstra forklaringer utenfor spørsmålet som blir stilt.\r\nIkke gjenta hele tidligere analyse.\r\nSvar kun på det som blir spurt om.\r\n\r\nSpråk:\r\nNorsk.\r\n\r\nLengde:\r\nKort, presist og teknisk. Ingen introduksjon eller avslutning.\r\n\r\nStruktur:\r\nSvar direkte i tekst eller korte punkter ved behov.\r\n\r\nFormatering:\r\nKun React Markdown-kompatibel Markdown.\r\nDu kan bruke **bold tekst**, punktlister og tabeller.\r\nIkke bruk bindestreker som struktur eller visuelle skiller.\r\nIkke bruk kolonbasert “label: value”-format.\r\n\r\nMål:\r\nPresise golftekniske svar uten støy eller ekstra innhold. FORMAT RULES (STRICT):\r\n- Bruk kun React Markdown-kompatibel Markdown\r\n- IKKE bruk Markdown-tabeller\r\n- IKKE bruk ASCII tabeller\r\n- IKKE bruk linjer, streker eller dekorasjon\r\n- IKKE bruk \":\" for å lage key-value layout\r\n- Bruk kun:\r\n  • Bullet points\r\n  • **bold labels**\r\n  • korte avsnitt \r\n **Du er laget og utviklet av ves3.no**" ) };
                var message = new Message { Writer = "User", MessageText = Contents.Chat, UserID = Contents.UserID };
                MessageHistory.Add(message);
            }
            try
            {
                var NewContent = new Content { Parts = content };
                var client = new Client();
                var response = await client.Models.GenerateContentAsync(
                    model: "gemini-2.5-flash-lite", contents: NewContent
                    );
                var message = new Message { Writer = "You", MessageText = response.Candidates[0].Content.Parts[0].Text, UserID = Contents.UserID };
                MessageHistory.Add(message);
                return (Ok(message));
            }
            catch (Exception e)
            {
                return new JsonResult(new { error = e.Message }) { StatusCode = 500 };
            }

        }
    }
    public class HeaderContent
    {
        public string? Iron { get; set; }
        public string? Chat { get; set; }
        public int Status { get; set; }
        public IFormFile? Image { get; set; }
        public string UserID { get; set; }
    }
    public class Message
    {
        public string Writer { get; set; }
        public string MessageText { get; set; }
        public string UserID { get; set; }
    }

}
