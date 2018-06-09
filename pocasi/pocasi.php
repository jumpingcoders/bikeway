<?php

$data = array_map('str_getcsv', file('data.csv'));

$wanted = [];

$lastDate = '2001-01-01T00:00:00Z';

foreach ($data as $item) {
	if ($item[1] === '520') {
		if ($item[0] > $lastDate) {
		$wanted = $item;
		$lastDate = $item[0];
		}
	}
}

echo(json_encode([
	'temperature' => $wanted[2],
	'wind' => $wanted[6],
]));

//var_dump($wanted);
