// Renderizador seguro de formato editorial (negrita, cursiva, subtítulos, citas y listas)
// Compatible con texto plano antiguo y con la barra de formato de /redaccion

function escapeHtml(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatInline(escapedText: string): string {
  return escapedText
    // ***negrita y cursiva***
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold text-ink"><em class="italic">$1</em></strong>')
    // **negrita**
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>')
    // *cursiva*
    .replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, '$1<em class="italic">$2</em>')
    // __subrayado__
    .replace(/__(.+?)__/g, '<u class="underline decoration-burgundy/60 underline-offset-4">$1</u>');
}

export function renderEditorialHtml(rawContent: string): string {
  const lines = String(rawContent || '').split(/\r?\n/);
  const blocks: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(`<ul class="list-disc pl-6 space-y-2 my-4">${listItems.join('')}</ul>`);
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }

    // Lista con guion o viñeta
    const listMatch = line.match(/^[-•]\s+(.+)$/);
    if (listMatch) {
      listItems.push(`<li>${formatInline(escapeHtml(listMatch[1]))}</li>`);
      continue;
    }

    flushList();

    // Subtítulo (## o ###)
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      blocks.push(
        `<h2 class="font-serif text-2xl sm:text-3xl font-bold text-ink mt-8 mb-3 leading-snug">${formatInline(
          escapeHtml(headingMatch[1])
        )}</h2>`
      );
      continue;
    }

    // Cita (> texto)
    const quoteMatch = line.match(/^>\s*(.+)$/);
    if (quoteMatch) {
      blocks.push(
        `<blockquote class="border-l-4 border-burgundy pl-4 py-2 my-5 italic text-ink/85 bg-surface">${formatInline(
          escapeHtml(quoteMatch[1])
        )}</blockquote>`
      );
      continue;
    }

    // Párrafo normal
    blocks.push(`<p>${formatInline(escapeHtml(line))}</p>`);
  }

  flushList();
  return blocks.join('\n');
}
