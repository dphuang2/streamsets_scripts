<h3>Streamsets setup for Windows 10 64 bit </h3>
Mac should use Vagrant for persistent development environment (makes it easy)
<ol>
    <li> Install Vagrant, Ruby, and Git </li>
    Have to manually install VirtualBox on Mac
    <li> vagrant box add ubuntu/trusty64 </li>
    Important Note: MUST USE Ubuntu 14.04 or above to follow StreamSets requirements <br>
    if there are problems adding the box, install C++ 2010 SP1 Reidistributable Package (x86): https://github.com/mitchellh/vagrant/issues/6852 
    <li> make folder to host VM (Ubuntu64) </li>
    <li> vagrant init ubuntu/trusty64 (inside of newly made folder) </li>
    <li> Download Vagrantfile from https://github.com/dphuang2/dotfiles </li>
    <li> replace new Vagrantfile made from init with downloaded Vagrantfile </li>
    <li> vagrant up (inside of folder) </li>
    Make sure that the shell that you are in is being "Run as Administrator"
    <li> add C:\Program Files (x86)\Git\bin to path environment variables </li>
    This requires an install of git
    <li> vagrant ssh [to ssh into the virtual box] </li>
    <li> wget https://archives.streamsets.com/datacollector/1.4.0.0/tarball/streamsets-datacollector-all-1.4.0.0.tgz </li>
    this takes a while since Streamsets is very large
    <li> tar xvzf streamsets-datacollector-all-1.4.0.0.tgz </li>
    <li> follow steps to install Oracle JDK 8 in the link below </li>   
    https://www.digitalocean.com/community/tutorials/how-to-install-java-on-ubuntu-with-apt-get
    <li> sudo update-alternatives --config java and select Java 8 </li>
    above step is only needed in the case that multiple java versions are installed <br>
    http://www.mkyong.com/java/java-unsupported-major-minor-version-51-0/ for explanation of last two steps
    <li> streamsets-datacollector-1.4.0.0/bin/streamsets dc </li>
    <li> navigate to "55.55.55.5:18630" in browser </li>
    <li> login with user: admin, pass: admin </li>
    important to note that you must use shared folder (/vagrant) to share files with streamsets
</ol>
<h5> Old steps for Streamsets </h5>
<ul>
    <del> <li> follow steps to install Open JDK 7 in the link below </li> </del> 
    <del> <li> edit Vagrantfile by uncommenting private-network line and changing ip to "55.55.55.5" </li> </del>
    <del> <li> add JAVA_HOME="/usr/lib/jvm/java-8-oracle" to your "/etc/environment" file </li> </del>
</ul>
