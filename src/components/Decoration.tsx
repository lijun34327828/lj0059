interface DecorationProps {
  pattern: 'petals' | 'leaves'
  color: string
  opacity: number
}

export default function Decoration({ pattern, color, opacity }: DecorationProps) {
  if (pattern === 'petals') {
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity }}
        viewBox="0 0 600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity={0.55}>
          <ellipse cx="50" cy="55" rx="16" ry="22" transform="rotate(-20 50 55)" fill={color} />
          <ellipse cx="62" cy="40" rx="16" ry="22" transform="rotate(20 62 40)" fill={color} />
          <ellipse cx="38" cy="40" rx="16" ry="22" transform="rotate(-50 38 40)" fill={color} />
          <ellipse cx="50" cy="30" rx="16" ry="22" transform="rotate(50 50 30)" fill={color} />
          <ellipse cx="50" cy="45" rx="10" ry="10" fill={color} opacity={0.7} />
        </g>
        <g opacity={0.45}>
          <ellipse cx="555" cy="40" rx="14" ry="19" transform="rotate(-15 555 40)" fill={color} />
          <ellipse cx="567" cy="28" rx="14" ry="19" transform="rotate(25 567 28)" fill={color} />
          <ellipse cx="543" cy="28" rx="14" ry="19" transform="rotate(-45 543 28)" fill={color} />
          <ellipse cx="555" cy="20" rx="14" ry="19" transform="rotate(55 555 20)" fill={color} />
          <ellipse cx="555" cy="34" rx="8" ry="8" fill={color} opacity={0.7} />
        </g>
        <g opacity={0.35}>
          <ellipse cx="25" cy="420" rx="13" ry="18" transform="rotate(-25 25 420)" fill={color} />
          <ellipse cx="37" cy="407" rx="13" ry="18" transform="rotate(15 37 407)" fill={color} />
          <ellipse cx="13" cy="407" rx="13" ry="18" transform="rotate(-55 13 407)" fill={color} />
          <ellipse cx="25" cy="400" rx="13" ry="18" transform="rotate(45 25 400)" fill={color} />
          <ellipse cx="25" cy="413" rx="7" ry="7" fill={color} opacity={0.7} />
        </g>
        <g opacity={0.5}>
          <ellipse cx="570" cy="460" rx="15" ry="20" transform="rotate(-10 570 460)" fill={color} />
          <ellipse cx="583" cy="446" rx="15" ry="20" transform="rotate(30 583 446)" fill={color} />
          <ellipse cx="557" cy="446" rx="15" ry="20" transform="rotate(-40 557 446)" fill={color} />
          <ellipse cx="570" cy="438" rx="15" ry="20" transform="rotate(60 570 438)" fill={color} />
          <ellipse cx="570" cy="452" rx="9" ry="9" fill={color} opacity={0.7} />
        </g>
        <g opacity={0.4}>
          <ellipse cx="45" cy="820" rx="14" ry="19" transform="rotate(-18 45 820)" fill={color} />
          <ellipse cx="57" cy="807" rx="14" ry="19" transform="rotate(22 57 807)" fill={color} />
          <ellipse cx="33" cy="807" rx="14" ry="19" transform="rotate(-48 33 807)" fill={color} />
          <ellipse cx="45" cy="800" rx="14" ry="19" transform="rotate(52 45 800)" fill={color} />
          <ellipse cx="45" cy="814" rx="8" ry="8" fill={color} opacity={0.7} />
        </g>
        <g opacity={0.48}>
          <ellipse cx="560" cy="860" rx="13" ry="18" transform="rotate(-22 560 860)" fill={color} />
          <ellipse cx="572" cy="848" rx="13" ry="18" transform="rotate(18 572 848)" fill={color} />
          <ellipse cx="548" cy="848" rx="13" ry="18" transform="rotate(-52 548 848)" fill={color} />
          <ellipse cx="560" cy="841" rx="13" ry="18" transform="rotate(48 560 841)" fill={color} />
          <ellipse cx="560" cy="854" rx="7" ry="7" fill={color} opacity={0.7} />
        </g>
        <ellipse cx="300" cy="880" rx="8" ry="11" transform="rotate(-30 300 880)" fill={color} opacity={0.2} />
        <ellipse cx="150" cy="870" rx="6" ry="9" transform="rotate(20 150 870)" fill={color} opacity={0.18} />
        <ellipse cx="480" cy="885" rx="7" ry="10" transform="rotate(-40 480 885)" fill={color} opacity={0.15} />
      </svg>
    )
  }

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      viewBox="0 0 600 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={0.5}>
        <path d="M35 50 C42 25 62 22 58 40 C72 30 75 48 60 52 C68 68 50 72 44 56 C36 70 20 58 30 48 C14 42 18 25 35 50Z" fill={color} />
        <path d="M35 50 C38 38 48 35 46 42" stroke={color} strokeWidth="0.5" opacity={0.6} />
      </g>
      <g opacity={0.45}>
        <path d="M560 35 C567 10 587 7 583 25 C597 15 600 33 585 37 C593 53 575 57 569 41 C561 55 545 43 555 33 C539 27 543 10 560 35Z" fill={color} />
        <path d="M560 35 C563 23 573 20 571 27" stroke={color} strokeWidth="0.5" opacity={0.6} />
      </g>
      <g opacity={0.35}>
        <path d="M20 430 C27 405 47 402 43 420 C57 410 60 428 45 432 C53 448 35 452 29 436 C21 450 5 438 15 428 C-1 422 3 405 20 430Z" fill={color} />
        <path d="M20 430 C23 418 33 415 31 422" stroke={color} strokeWidth="0.5" opacity={0.6} />
      </g>
      <g opacity={0.5}>
        <path d="M575 470 C582 445 602 442 598 460 C612 450 615 468 600 472 C608 488 590 492 584 476 C576 490 560 478 570 468 C554 462 558 445 575 470Z" fill={color} />
        <path d="M575 470 C578 458 588 455 586 462" stroke={color} strokeWidth="0.5" opacity={0.6} />
      </g>
      <g opacity={0.4}>
        <path d="M40 845 C47 820 67 817 63 835 C77 825 80 843 65 847 C73 863 55 867 49 851 C41 865 25 853 35 843 C19 837 23 820 40 845Z" fill={color} />
        <path d="M40 845 C43 833 53 830 51 837" stroke={color} strokeWidth="0.5" opacity={0.6} />
      </g>
      <g opacity={0.42}>
        <path d="M565 870 C572 845 592 842 588 860 C602 850 605 868 590 872 C598 888 580 892 574 876 C566 890 550 878 560 868 C544 862 548 845 565 870Z" fill={color} />
        <path d="M565 870 C568 858 578 855 576 862" stroke={color} strokeWidth="0.5" opacity={0.6} />
      </g>
      <path d="M300 885 C304 875 312 873 310 879" stroke={color} strokeWidth="0.5" opacity={0.15} />
      <path d="M150 878 C154 868 162 866 160 872" stroke={color} strokeWidth="0.5" opacity={0.12} />
    </svg>
  )
}
