import jsPDF from 'jspdf'

export function generateReport(result, language) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 40
  const pageWidth = doc.internal.pageSize.getWidth()
  const maxWidth = pageWidth - margin * 2
  let y = margin

  const writeHeading = (text, size = 18, color = [99, 102, 241]) => {
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...color)
    doc.setFontSize(size)
    if (y > 760) { doc.addPage(); y = margin }
    doc.text(text, margin, y)
    y += size + 6
  }
  const writeText = (text, size = 11, color = [40, 40, 50]) => {
    if (!text) return
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...color)
    doc.setFontSize(size)
    const lines = doc.splitTextToSize(String(text), maxWidth)
    for (const line of lines) {
      if (y > 800) { doc.addPage(); y = margin }
      doc.text(line, margin, y)
      y += size + 4
    }
    y += 4
  }
  const writeList = (arr) => {
    if (!arr || !arr.length) { writeText('— None found —'); return }
    for (const item of arr) writeText('• ' + item)
  }

  // Title
  doc.setFillColor(10, 10, 15)
  doc.rect(0, 0, pageWidth, 70, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(241, 245, 249)
  doc.setFontSize(22)
  doc.text('🐛 BugBaba AI — Code Review Report', margin, 44)
  doc.setFontSize(10)
  doc.setTextColor(148, 163, 184)
  doc.text(`Language: ${language}  •  Mode: ${result.mode_used}  •  ${new Date().toLocaleString()}`, margin, 60)
  y = 100

  writeHeading('Bug Summary', 16, [239, 68, 68])
  writeText(result.bug_summary)

  writeHeading('Bugs', 14, [239, 68, 68])
  writeList(result.bugs)

  writeHeading('Security Issues', 14, [245, 158, 11])
  writeList(result.security_issues)

  writeHeading('Logic Mistakes', 14, [139, 92, 246])
  writeList(result.logic_mistakes)

  writeHeading('Performance Problems', 14, [99, 102, 241])
  writeList(result.performance_problems)

  writeHeading('Fixed Code', 14, [16, 185, 129])
  doc.setFont('courier', 'normal')
  writeText(result.fixed_code, 9, [30, 30, 40])

  writeHeading('Explain Like I\'m 5', 14, [99, 102, 241])
  writeText(result.beginner_explanation)

  writeHeading('The Roast 🎤', 14, [249, 115, 22])
  writeText(result.roast)

  writeHeading('Quality Score', 14, [99, 102, 241])
  writeText(`${result.quality_score} / 10  —  Difficulty: ${result.difficulty_level}`)

  writeHeading('Interviewer Says...', 14, [148, 163, 184])
  writeText(result.interview_feedback)

  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  doc.save(`bugbaba-report-${language}-${ts}.pdf`)
}
