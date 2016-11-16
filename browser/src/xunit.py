from xml.etree import ElementTree

with open('/results.xml') as fh:
    xunit = ElementTree.fromstring(fh.read())
if sum(int(testsuite.get('failures')) for testsuite in xunit.findall('testsuite')):
    exit(1)
