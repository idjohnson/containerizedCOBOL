# start by building the basic container
FROM centos:latest
MAINTAINER Isaac Johnson <isaac.johnson@gmail.com>

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*


RUN yum update -y
RUN yum install -y gcc-gfortran gdb make curl gmp-devel libtool libdb-devel.x86_64 ncurses-devel

# COBOL
RUN curl -O https://ftp.gnu.org/gnu/gnucobol/gnu-cobol-1.1.tar.gz
RUN tar -xzf gnu-cobol-1.1.tar.gz
RUN cd gnu-cobol-1.1 && ./configure && make && make install

# COBOL Compile
COPY myFirstCob.cob /cobol/
WORKDIR /cobol/
RUN echo "/usr/local/lib" >> /etc/ld.so.conf.d/gnu-cobol-1.1.conf
RUN ldconfig
RUN cobc -V
RUN cobc -x -free -o cobolApp myAddCobol3.cob
RUN ./myFirstCob

# NodeJs
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs

COPY *.cob run_cobol.sh package.json package-lock.json server.js ./
RUN npm install

# configure the container to run the hello world executable by default
# CMD ["./HelloWorld"]
ENTRYPOINT ["./run_cobol.sh"]

#harbor.freshbrewed.science/freshbrewedprivate/coboladder:0.0.1