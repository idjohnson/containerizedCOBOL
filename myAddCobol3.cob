IDENTIFICATION DIVISION.
PROGRAM-ID. ADD-NUMBERS.

ENVIRONMENT DIVISION.
INPUT-OUTPUT SECTION.
FILE-CONTROL.
   SELECT INPUT-FILE 
      ASSIGN TO "input.txt"
      ORGANIZATION IS LINE SEQUENTIAL.
   SELECT OUTPUT-FILE 
      ASSIGN TO "output.txt"
      ORGANIZATION IS LINE SEQUENTIAL.

DATA DIVISION.
FILE SECTION.
   FD  INPUT-FILE.
   01  INPUT-RECORD.
      05  INPUT-REAL-DP PIC 9(36).
   FD  OUTPUT-FILE.
   01  OUTPUT-RECORD.
      05  OUTPUT-NUMBER PIC 9(36).

WORKING-STORAGE SECTION.
       01  TOTAL PIC 9(36).
       01  END-OF-FILE  PIC X(3) VALUE 'FLS'.

PROCEDURE DIVISION.
   OPEN INPUT INPUT-FILE
   OPEN OUTPUT OUTPUT-FILE
   READ INPUT-FILE
      AT END MOVE 'TRU' TO END-OF-FILE
      NOT AT END ADD INPUT-REAL-DP TO TOTAL
   END-READ
   PERFORM UNTIL END-OF-FILE = "TRU"
      READ INPUT-FILE
         AT END MOVE 'TRU' TO END-OF-FILE
         NOT AT END ADD INPUT-REAL-DP TO TOTAL
      END-READ
   END-PERFORM
   MOVE TOTAL TO OUTPUT-NUMBER
   WRITE OUTPUT-RECORD
   CLOSE INPUT-FILE, OUTPUT-FILE
   STOP RUN.
