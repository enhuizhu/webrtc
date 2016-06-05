<?php

require_once("helper.php");

class helperTest extends PHPUnit_Framework_TestCase{
	public function testGetPort() {
		$config = getPort();
		$this->assertEquals(8080, $config->port);
	}
}